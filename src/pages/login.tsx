import React from 'react';
import Head from 'next/head';

const LoginPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="tw-flex tw-min-h-screen tw-bg-gray-100 tw-justify-center tw-items-center">
        <div className="tw-flex tw-w-3/4 tw-bg-white tw-shadow-lg tw-rounded-lg tw-overflow-hidden">
          <div className="tw-w-3/5 tw-p-5">
            <h2 className="tw-text-3xl tw-text-gray-700 tw-font-bold">Login</h2>
            <form className="tw-space-y-6 tw-mt-4">
              <input
                type="text"
                className="tw-w-full tw-p-3 tw-border tw-rounded tw-placeholder-gray-300"
                placeholder="Username"
              />
              <input
                type="password"
                className="tw-w-full tw-p-3 tw-border tw-rounded tw-placeholder-gray-300"
                placeholder="Password"
              />
              <button type="submit" className="tw-w-full tw-bg-blue-500 tw-p-3 tw-rounded tw-text-white tw-hover:bg-blue-600">
                Sign In
              </button>
            </form>
          </div>
          <div className="tw-w-2/5 tw-bg-blue-500 tw-text-white tw-p-5 tw-flex tw-flex-col tw-justify-between">
            <div>
              <h2 className="tw-text-3xl tw-font-bold">Welcome Back!</h2>
              <p className="tw-mt-2">Enter your details to reconnect to your space.</p>
            </div>
            <div>
              <p>If you are new, please <a href="/register" className="tw-text-white tw-underline">register here</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
