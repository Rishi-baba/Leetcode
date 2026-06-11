import axios from "axios";

export const submitBatch = async (submissions) => {
  const options = {
    method: "POST",
    url: "https://ce.judge0.com/submissions/batch",
    params: {
      base64_encoded: false,
    },
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      submissions,
    },
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(
        "Judge0 Error:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  return await fetchData();
};

const waiting = (timer) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timer);
  });
};

export const submitToken = async (resultToken) => {
  const options = {
    method: "GET",
    url: "https://ce.judge0.com/submissions/batch",
    params: {
      tokens: resultToken.join(","),
      base64_encoded: false,
      fields: "*",
    },
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(
        "Judge0 Error:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  while (true) {
    const result = await fetchData();

    const isResultObtained = result.submissions.every(
      (r) => r.status.id > 2
    );

    if (isResultObtained) {
      return result.submissions;
    }

    await waiting(1000);
  }
};

export const getLanguageById = (lang) => {
  const language = {
    "c++": 105,
    java: 91,
    javascript: 102,
  };

  return language[lang.toLowerCase()];
};