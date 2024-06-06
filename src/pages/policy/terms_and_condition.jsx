import React, { useState, useEffect, useRef } from "react";

function Login() {

    return (
        <>
            <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px', lineHeight: '1.6' }}>
                <h1>Terms and Conditions</h1>
                <p><strong>Last updated:</strong> June 5, 2024</p>

                <p>Welcome to GamifyLife! These terms and conditions outline the rules and regulations for the use of PT TEKNOLOGI CALAKAN's application and website.</p>

                <p>By using the app or the website, you agree to these terms. If you do not agree with any part of these terms, you may not use the app or the website.</p>
                <br />
                <h2><strong>1. Use of the App and Website</strong></h2>
                <ul style={{ listStyleType: 'disc' }}>
                    <li className="ms-10">The app and website are currently free to use. We reserve the right to introduce fees for certain features or services in the future. Users will be notified in advance of any changes to pricing.</li>
                </ul>
                <br />
                <h2><strong>2. Data Collection and Use</strong></h2>
                <ul style={{ listStyleType: 'disc' }}>
                    <li className="ms-10">We collect data from users to improve the app's and website's functionality and enhance user experience. This includes, but is not limited to, usage data, device information, and location data.</li>
                    <li className="ms-10">The security of your data is of utmost importance to us. We employ robust security measures to protect your information from unauthorized access, alteration, or disclosure.</li>
                    <li className="ms-10">Your data will only be used internally for improving the app and website and will not be shared with third parties without your explicit consent, except as required by law.</li>
                </ul>
                <br />
                <h2><strong>3. User Responsibilities</strong></h2>
                <ul style={{ listStyleType: 'disc' }}>
                    <li className="ms-10">Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.</li>
                    <li className="ms-10">Users must not use the app or website in any way that causes, or may cause, damage to the app or website or impairment of the availability or accessibility of the app or website.</li>
                    <li className="ms-10">Users must not use the app or website for any unlawful, illegal, fraudulent, or harmful purpose or activity.</li>
                </ul>
                <br />
                <h2><strong>4. Intellectual Property Rights</strong></h2>
                <ul style={{ listStyleType: 'disc' }}>
                    <li className="ms-10">The app, website, and their original content, features, and functionality are and will remain the exclusive property of PT TEKNOLOGI CALAKAN and its licensors.</li>
                    <li className="ms-10">You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products, or services obtained from the app or website.</li>
                </ul>
                <br />
                <h2><strong>5. Limitation of Liability</strong></h2>
                <ul style={{ listStyleType: 'disc' }}>
                    <li className="ms-10">The app and website are provided on an "as is" and "as available" basis. PT TEKNOLOGI CALAKAN makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</li>
                    <li className="ms-10">In no event shall PT TEKNOLOGI CALAKAN be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the app or website, even if PT TEKNOLOGI CALAKAN or a PT TEKNOLOGI CALAKAN authorized representative has been notified orally or in writing of the possibility of such damage.</li>
                </ul>
                <br />
                <h2><strong>6. Changes to These Terms and Conditions</strong></h2>
                <ul style={{ listStyleType: 'disc' }}>
                    <li className="ms-10">We may update our Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Terms and Conditions on this page. These changes are effective immediately after they are posted on this page.</li>
                </ul>
                <br />
                <h2><strong>7. Governing Law</strong></h2>
                <ul style={{ listStyleType: 'disc' }}>
                    <li className="ms-10">These terms and conditions are governed by and construed in accordance with the laws of Indonesia and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</li>
                </ul>
                <br />
                <br />
                <h2><strong>Contact Us</strong></h2>
                <ul style={{ listStyleType: 'disc' }}>
                    <li className="ms-10">If you have any questions or suggestions about our Terms and Conditions, do not hesitate to contact us at <a href="mailto:nugrohorizki191@gmail.com">nugrohorizki191@gmail.com</a>.</li>
                </ul>
            </div>
        </>
    );
}

export default Login;

