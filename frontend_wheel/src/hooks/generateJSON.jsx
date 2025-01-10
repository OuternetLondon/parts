const generateControlJSON = (userId, controlType, action, data) => {
    return {
      userId,
      timestamp: new Date().toISOString(),
      name: "default",
      controlType,
      action,
      data,
    };
  };

export default generateControlJSON;