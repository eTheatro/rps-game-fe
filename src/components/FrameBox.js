


export const FrameBox = (props) => {
    return <div style={{
        border: '1px solid rgba(0, 0, 20, 0.3)',
        borderRadius: 10,
        position: 'absolute', backgroundColor: '#f0f0f0', width: props.width, height: props.height, ...props.style
    }}>
    </div>;
}