import ManWalking from './ManWalking.json';
import Lottie from 'lottie-react';

const ManWalkingAnimation = () => {
    return <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        width: '400px',
        height: '400px',
    }}>
        <Lottie animationData={ManWalking} loop={true} />;
    </div>
};

export default ManWalkingAnimation;