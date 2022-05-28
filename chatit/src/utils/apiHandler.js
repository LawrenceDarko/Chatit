const POST = "POST"

class ApiCallHandler {
  static POST = POST; 
  static GET = "GET";
  static async send(URL, method = POST, data) {
    if (!URL) return null;
    const requestParams = {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      method,
      body: JSON.stringify(data),
    };
    try {
      const res = await fetch(URL, requestParams);
      return res.json();
    } catch (error) {
    }
    
  }
}
export default ApiCallHandler;
