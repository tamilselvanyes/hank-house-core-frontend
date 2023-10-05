export class ResponseError extends Error {
  public response: Response;
  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}
/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response: Response) {
  if (response.status >= 200 && response.status <= 400) {
    return response;
  }
  const error = new ResponseError(response);
  error.response = response;
  throw error;
}
/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export async function request(
  url: string,
  options?: RequestInit
): Promise<{} | { err: ResponseError }> {
  if (options) {
    options["headers"] = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    });
  }
  const fetchResponse = await fetch(url, options);
  const response = checkStatus(fetchResponse);
  return parseJSON(response);
}
export async function requestFile(
  url: string,
  options?: RequestInit
): Promise<{} | { err: ResponseError }> {
  const fetchResponse = await fetch(url, options);
  const response = checkStatus(fetchResponse);
  return parseJSON(response);
}
export async function requestStreaming(
  url: string,
  options?: RequestInit
): Promise<any | { err: ResponseError }> {
  if (options) {
    options["headers"] = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    });
  }
  const fetchResponse = await fetch(url, options)
    .then((response) => {
      let reader: any;
      if (response && response.body) {
        reader = response.body.getReader();
        return new ReadableStream({
          start(controller) {
            return pump();
            function pump() {
              return reader.read().then((result: any) => {
                // When no more data needs to be consumed, close the stream
                const { done, value } = result;
                if (done) {
                  controller.close();
                  return;
                }
                // Enqueue the next data chunk into our target stream
                controller.enqueue(value);
                return pump();
              });
            }
          },
        });
      }
    })
    // Create a new response out of the stream
    .then((stream) => new Response(stream))
    // Create an object URL for the response
    .then((response) => response.blob())
    // .then(blob => URL.createObjectURL(blob))
    // Update image
    // .then(url => console.log(url))
    .catch((err) => console.error(err));
  // const response = checkStatus(fetchResponse);
  return fetchResponse;
}
