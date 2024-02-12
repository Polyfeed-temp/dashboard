/**
 * @deprecated
 */
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
/**
 * @deprecated
 */
import {User, UserState} from "../types";
/**
 * @deprecated
 */
import UserService from "../services/user.service";
/**
 * @deprecated
 */
interface UserAction {
  type: "LOGIN";
  payload?: {username: string; password: string};
}
/**
 * @deprecated
 */
interface LogoutAction {
  type: "LOGOUT";
}
/**
 * @deprecated
 */
interface InitializeAction {
  type: "INITIALIZE";
  payload: UserState;
}
/**
 * @deprecated
 */
type actions = UserAction | InitializeAction | LogoutAction;
/**
 * @deprecated
 */
const UserContext = createContext<
  {state: UserState; dispatch: React.Dispatch<actions>} | undefined
>(undefined);
/**
 * @deprecated
 */
function userReducer(state: UserState, action: actions): UserState {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...action.payload,
        user: action.payload.user,
        login: true,
      };
    case "LOGOUT":
      return {
        ...state,
        login: false,
        user: null,
        access_token: undefined,
      };

    default:
      return state;
  }
}
/**
 * @deprecated
 */
function UserProvider({children}: {children: ReactNode}) {
  const initialState: UserState = {
    login: false,
    user: null,
  };
  const service = new UserService();
  const [state, baseDispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await service.getUser();
        if (user) {
          baseDispatch({type: "INITIALIZE", payload: user});
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const serviceDispatch = async (action: actions) => {
    switch (action.type) {
      case "LOGIN":
        if (action.payload) {
          console.log("From service dispatch");
          try {
            const res = await service.login(
              action.payload.username,
              action.payload.password
            );
            console.log(res);

            baseDispatch({type: "INITIALIZE", payload: res});
            window.location.href = "/";
          } catch (err) {
            console.log(err);
          }
        }

        break;
      case "LOGOUT":
        service.logout();
        baseDispatch(action);
        break;

      default:
        baseDispatch(action);
    }
  };

  return (
    <UserContext.Provider value={{state, dispatch: serviceDispatch}}>
      {children}
    </UserContext.Provider>
  );
}
/**
 * @deprecated
 */
export default UserProvider;
/**
 * @deprecated
 */
export function useUserState() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context.state;
}
/**
 * @deprecated
 */
export function useUserDispatch() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context.dispatch;
}
