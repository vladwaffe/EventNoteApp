import React from 'react';
import './Test.css'
const TestItem = () => {
    return (
        <div className="scene">
            <div className="upper">
                <div className="moon">
                    <div className="crater1"></div>
                    <div className="crater2"></div>
                </div>
                <div className="star1"></div>
                <div className="star2"></div>
                <div className="star3"></div>
                <div className="cloud1">
                    <div className="circle"></div>
                    <div className="filler"></div>
                </div>
                <div className="cloud2">
                    <div className="circle"></div>
                    <div className="filler"></div>
                </div>
                <div className="tail">
                    <div className="left"></div>
                    <div className="right"></div>
                    <div className="body"></div>
                </div>

                <div className="drop"></div>

            </div>
            <div className="lower">
                <div className="whale">
                    <div className="eye"></div>
                    <div className="detail1">
                        <div className="detail2"></div>
                    </div>

                </div>
                <div className="fin"></div>
            </div>
        </div>
    );
};
export default TestItem;
