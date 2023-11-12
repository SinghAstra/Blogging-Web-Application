import ManWalking from './ManWalking.json';
import Lottie from 'lottie-react';

const ManWalkingAnimation = () => {
    return <div style={{ width: 400, height: 400 }} className='animation-conatiner'>
        <Lottie animationData={ManWalking} loop={true} />;
    </div>
};

export default ManWalkingAnimation;