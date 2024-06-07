import React, {
  createContext,
  useContext,
  ReactNode,
  FunctionComponent,
} from "react";

interface PopupModalContextType {
  handleModalClose: () => void;
}

const PopupModalContext = createContext<PopupModalContextType>({
  handleModalClose: () => {},
});

interface PopupModalProviderProps {
  children: ReactNode;
  value: PopupModalContextType;
}

// this context is to support compound component pattern for defining BasicModal
export const PopupModalProvider: FunctionComponent<PopupModalProviderProps> = ({
  children,
  value,
}) => {
  return (
    <PopupModalContext.Provider value={value}>
      {children}
    </PopupModalContext.Provider>
  );
};

export const usePopupModalContext = () => useContext(PopupModalContext);
