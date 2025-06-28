// Helper to handle API response
export const handleResponse = async (response) => {
  console.log("API Response Status:", response.status, response.statusText);
  console.log("API Response URL:", response.url);

  if (!response.ok) {
    console.error("Response not OK:", response.status, response.statusText);

    try {
      // Try to parse error as JSON
      const errorData = await response.json();
      console.error("Error data:", errorData);

      return {
        status: "error",
        message:
          errorData.message ||
          `Error: ${response.status} ${response.statusText}`,
        data: null,
      };
    } catch (parseError) {
      console.error("Error parsing response:", parseError);
      // If JSON parsing fails, return the status text
      return {
        status: "error",
        message: `Error: ${response.status} ${response.statusText}`,
        data: null,
      };
    }
  }

  try {
    const data = await response.json();
    console.log("Response data received successfully");
    return {
      status: "success",
      data,
    };
  } catch (error) {
    console.error("Error parsing successful response:", error);
    return {
      status: "error",
      message: "Error parsing response data",
      data: null,
    };
  }
};

// Helper to handle errors in fetch calls
export const handleError = (error) => {
  console.error("API request failed:", error);
  return {
    status: "error",
    message: error.message || "An unexpected error occurred",
    data: null,
  };
};
