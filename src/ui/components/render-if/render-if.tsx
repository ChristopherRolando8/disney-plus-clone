import { RenderIfProps } from './render-if.type';

// ? Just an utils component, to conditionally render instead of using {isTrue ? (<></>) : (<></>)}
const RenderIf: React.FC<RenderIfProps> = (props) => {
	const { children, isTrue } = props;

	if (isTrue) return <>{children}</>;

	return null;
};

export default RenderIf;
