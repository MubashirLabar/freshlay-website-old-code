import axios from "axios";
import zuz from "../../core/Toast";

export const createpackages = (file, data) => async (dispatch) => {
  try {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", file);
    formData.append("data", JSON.stringify(JSON.stringify(data)));
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/package/createpackage`,
      formData,
      config
    );
    console.log(res);

    if (res.data.status === "success") {
      zuz.Toast.show({ html: `New Package added successfully`, time: 5 });
      return true;
    }
  } catch (error) {
    //  dispatch(setAlert('Failed to save image', 'danger'))
    console.log(error);
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};

export const deletepackages = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/package/getapackage/${id}`
    );
    if (res.data.status === "success") {
      zuz.Toast.show({ html: `Package deleted successfully`, time: 5 });
    }
    return true;
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};
