import React, {
  createContext,
  FC,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLocalItem, removeLocalItem } from "utils";
import { LOAD_STATE, Pages } from "config";
import { Axios } from "api";
import { userRoute } from "utils/ApiRoutes";

const initState = {
  setUser: () => ({}),
  user: {
    avatarImage: "",
    username: "",
    id: "",
  },
  loading: null,
};

const AuthContext = createContext(initState);

type Props = { children?: ReactNode };
type User = {
  avatarImage: string;
  email: string;
  isAvatarImageSet: boolean;
  username: string;
  id: string;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | {}>({});
  const [loading, setLoading] = useState<LOAD_STATE | "">("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pageCheck = () => {
    const location = pathname.split("/")[1];
    //@ts-ignore
    return location !== Pages.LOGIN && location !== Pages.REGISTER;
  };

  useEffect(() => {
    if (!user) return;
    if (!Object.keys(user).length) return;
    //@ts-ignore
    if (!user?.isAvatarImageSet) return navigate(Pages.AVATAR);
  }, [user]);

  useEffect(() => {
    if (pageCheck()) {
      const getUser = async () => {
        setLoading(LOAD_STATE.LOADING);
        const data = await Axios(
          //@ts-ignore
          `${userRoute}`,
          "get",
          {},
          {
            //@ts-ignore
            Authorization: `Bearer ${getLocalItem("token")}`,
          }
        );
        //@ts-ignore
        if (!data.data) {
          navigate(`/${Pages.LOGIN}`);
          removeLocalItem("token");
        }
        //@ts-ignore
        if (data.code === "ERR_NETWORK") return navigate(`/${Pages.LOGIN}`);
        //@ts-ignore
        if (data?.response?.data?.message === "Authorization token expired") {
          removeLocalItem("token");
          navigate(`/${Pages.LOGIN}`);
          setLoading("");
        } else {
          //@ts-ignore
          setUser(data.data);
          setLoading("");
        }
      };
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        //@ts-ignore
        user,
        //@ts-ignore
        setUser,
        //@ts-ignore
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
export const useAuthContainer = () => useContext(AuthContext);

export default AuthContext;
