export const setLocalItem = (name, value) => localStorage.setItem(name, value);
export const getLocalItem = (name) => localStorage.getItem(name);
export const removeLocalItem = (name) => localStorage.removeItem(name);

export const convertToBase64 = (file: Blob) =>
  new Promise((res, rej) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      res(fileReader.result);
    };
    fileReader.onerror = (error) => {
      rej(error);
    };
  });

export const hasPermission = () => getLocalItem("token");

export const toastProps = {
  position: "bottom-right",
  autoClose: 4000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const sizes = {
  mobile: "476px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1920px",
};

type Device = Record<"mobile" | "tablet" | "laptop" | "desktop", string>;

export const devices: Device = {
  mobile: sizes.mobile,
  tablet: sizes.tablet,
  laptop: sizes.laptop,
  desktop: sizes.desktop,
};
