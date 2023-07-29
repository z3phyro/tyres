export class FetchHelper {
  // Helper method to handle common fetch errors
  private static handleErrors(response: Response): Response {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  }

  // Helper method to convert response to JSON
  private static async parseJSON<T>(response: Response): Promise<T> {
    return response.json();
  }

  // Helper method to merge custom headers with default headers
  private static mergeHeaders(customHeaders?: HeadersInit): HeadersInit {
    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (!customHeaders) {
      return defaultHeaders;
    }

    return {
      ...defaultHeaders,
      ...customHeaders,
    };
  }

  // GET method
  static async get<T>(url: string, customHeaders?: HeadersInit): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: this.mergeHeaders(customHeaders),
      });

      this.handleErrors(response);
      return this.parseJSON<T>(response);
    } catch (error) {
      throw error;
    }
  }

  // POST method
  static async post<T>(url: string, data: object, customHeaders?: HeadersInit): Promise<T> {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: this.mergeHeaders(customHeaders),
        body: JSON.stringify(data),
      });

      this.handleErrors(response);
      return this.parseJSON<T>(response);
    } catch (error) {
      throw error;
    }
  }

  // PUT method
  static async put<T>(url: string, data: object, customHeaders?: HeadersInit): Promise<T> {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: this.mergeHeaders(customHeaders),
        body: JSON.stringify(data),
      });

      this.handleErrors(response);
      return this.parseJSON<T>(response);
    } catch (error) {
      throw error;
    }
  }

  // DELETE method
  static async delete<T>(url: string, customHeaders?: HeadersInit): Promise<T> {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: this.mergeHeaders(customHeaders),
      });

      this.handleErrors(response);
      return this.parseJSON<T>(response);
    } catch (error) {
      throw error;
    }
  }
}
