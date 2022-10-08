import getConfig from 'next/config';
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';

const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const { config } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    return (
        <div className="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div className="grid justify-content-center p-2 lg:p-0" style={{ minWidth: '80%' }}>
                <div className="col-12 mt-5 xl:mt-0 text-center">
                    <img src={`${contextPath}/layout/images/logo-${config.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5" style={{ width: '81px', height: '60px' }} />
                </div>
                <div className="col-12 xl:col-6" style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="h-full w-full m-0 py-7 px-4" style={{ borderRadius: '53px', background: 'linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0))' }}>
                        <div className="text-center mb-5">
                            <img src={`${contextPath}/demo/images/login/avatar.png`} alt="Image" height="50" className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>

                        <div className="w-full p-fluid md:w-10 mx-auto">
                            <label for="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText inputId="email1" type="text" placeholder="Email address" className="w-full mb-3" style={{ padding: '1rem' }} />

                            <label for="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password inputId="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="mb-3"></Password>

                            <div className="flex align-items-center justify-content-between mb-5">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" value={checked} onChange={(e) => setChecked(e.checked)} className="mr-2"></Checkbox>
                                    <label for="rememberme1" className="mr-2">
                                        Remember me
                                    </label>
                                </div>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Forgot password?
                                </a>
                            </div>
                            <Button label="Sign In" className="w-full p-3 text-xl"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

LoginPage.getInitialProps = () => {
    return { isLayoutNeeded: false };
};
export default LoginPage;
