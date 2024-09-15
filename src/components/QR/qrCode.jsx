import React from 'react';
import QRCode from 'react-qr-code';

const AuthQRCode = () => {
    const authURL = "https://www.shopify.com/blog/low-investment-business-ideas"; // надо потом будет поставить настоящию ссылку

    const divStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Можете использовать другую высоту, в зависимости от ваших потребностей
    };

    return (
        <div style={divStyle}>
            <QRCode value={authURL} />
            <p>Отсканируйте QR-код для авторизации через VK</p>
        </div>
    );
}

export default AuthQRCode;