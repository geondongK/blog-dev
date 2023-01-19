//  eslint-disable
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
// import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
// import { ThemeProvider } from '@mui/material';
import App from './App';
import { store, persistor } from './redux/store/store';
// let persistor = persistStore(store);

// ReactDOM.render 18에서 더 이상 지원하지 안함.
// 아래와 같이 수정.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {/* <ThemeProvider theme={theme}> */}
                <App />
                {/* </ThemeProvider> */}
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);

// App 시작부분
// StrictMode 반응이 추가 검사를 수행함을 의미 (보고서에 대한 경고가 있으면 콘솔에 경고를 표시.)
// ReactDOM.render(
//   <React.StrictMode>
//     {/* <ContextProvider> */}
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//     {/* </ContextProvider> */}

//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
