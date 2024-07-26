import { Box } from "@src/common/atoms";
import {
  AuthProvider,
  PageAuthUserRole,
} from "@src/features/auth/AuthProvider";
import "@src/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { NextComponentType } from "next";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import { AppProvider } from "@src/context/completedTutorial";

const font = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (failureCount >= 3) {
          return false;
        }
        if (isAxiosError(error)) {
          const statusCode = error.response?.status;
          if (!statusCode) {
            return true;
          }
          if (statusCode <= 500) {
            return false;
          }
          return true;
        }
        return true;
      },
    },
  },
});
type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: { role: PageAuthUserRole } };
};
function App({ Component, pageProps }: CustomAppProps) {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 8000,
        }}
      />
      {/* <QueryClientProvider client={queryClient}>
        <main className={`flex min-h-screen flex-col ${font.className}`}>
          {Component.auth ? (
            <AuthProvider role={Component.auth.role}>
              <Component {...pageProps} />
            </AuthProvider>
          ) : (
            <Component {...pageProps} />
          )}
        </main>
      </QueryClientProvider> */}
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
      <Box id="modal-root" />
    </>
  );
}

export default appWithTranslation(App);














// import { Box } from "@src/common/atoms";
// import {
//   AuthProvider,
//   PageAuthUserRole,
// } from "@src/features/auth/AuthProvider";
// import "@src/styles/globals.css";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { isAxiosError } from "axios";
// import { NextComponentType } from "next";
// import { appWithTranslation } from 'next-i18next';
// import type { AppProps } from "next/app";
// import { Poppins } from "next/font/google";
// import { Toaster } from "react-hot-toast";
// import 'tailwindcss/tailwind.css';
// import { AppProvider } from "@src/context/completedTutorial";
// import nextI18NextConfig from '../../next-i18next.config';
// import i18next from 'i18next';
// import { initReactI18next } from 'react-i18next';

// // Inicjalizacja i18next
// // i18next
// //   .use(initReactI18next)
// //   .init({
// //     ...nextI18NextConfig.i18n,
// //     detection: {
// //       order: ['queryString', 'cookie'],
// //       caches: ['cookie'],
// //     },
// //     fallbackLng: 'an',
// //     react: {
// //       useSuspense: false,
// //     },
// //   });

// const font = Poppins({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
// });

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: (failureCount, error) => {
//         if (failureCount >= 3) {
//           return false;
//         }
//         if (isAxiosError(error)) {
//           const statusCode = error.response?.status;
//           if (!statusCode) {
//             return true;
//           }
//           if (statusCode <= 500) {
//             return false;
//           }
//           return true;
//         }
//         return true;
//       },
//     },
//   },
// });

// type CustomAppProps = AppProps & {
//   Component: NextComponentType & { auth?: { role: PageAuthUserRole } };
// };

// function App({ Component, pageProps }: CustomAppProps) {
//   return (
//     <>
//       <Toaster
//         position="top-right"
//         reverseOrder={false}
//         gutter={8}
//         toastOptions={{
//           duration: 8000,
//         }}
//       />
//       {/* <QueryClientProvider client={queryClient}>
//         <main className={`flex min-h-screen flex-col ${font.className}`}>
//           {Component.auth ? (
//             <AuthProvider role={Component.auth.role}>
//               <Component {...pageProps} />
//             </AuthProvider>
//           ) : (
//             <Component {...pageProps} />
//           )}
//         </main>
//       </QueryClientProvider> */}

//       <AppProvider>
//         <Component {...pageProps} />
//       </AppProvider>

//       <Box id="modal-root" />
//     </>
//   );
// }

//export default appWithTranslation(App);
