import React from 'react';

function Footer() {
    return (
        <div className='bg-success p-1' >

            
            <footer className="text-white py-4 ">

                <div className="container text-center">
                    <h5 className="mb-2">CivicFix</h5>
                    <p className="mb-2">
                        Empowering citizens to report civic issues and build smarter communities across Kerala.
                    </p>
                    <div className="d-flex justify-content-center gap-3 mb-2">
                        <a href="#" className="text-white text-decoration-none">Privacy Policy</a>
                        <a href="#" className="text-white text-decoration-none">Terms of Service</a>
                        <a href="#" className="text-white text-decoration-none">Contact</a>
                    </div>
                    <small>&copy; {new Date().getFullYear()} CivicFix. All rights reserved.</small>
                </div>
            </footer>
        </div>
    )

}

export default Footer