
in vec2 vVertex;
uniform sampler2D uImageUnit;
uniform float uScale;

void main()
{
	vec2 pout;
	pout.x = vVertex.x;
	if(vVertex.y<0.9 && vVertex.y>0.1) {
			pout.y = 0.9 - (0.9-pout.y)/uScale;
			vec4 rgb = texture2D(uImageUnit, pout);
			gl_FragColor = rgb;
	} else {
		gl_FragColor = texture2D(uImageUnit, vVertex);
	}
}