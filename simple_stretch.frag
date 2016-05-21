
in vec2 vST;
uniform sampler2D uImageUnit;
uniform float uScale;

void main()
{
	vec2 pout;
	if(vST.t<0.9 && vST.t>0.1) {
	    pout.s = vST.s;
			pout.t = 0.9 - (0.9-vST.t)/uScale;
			vec4 rgb = texture2D(uImageUnit, pout);
			gl_FragColor = rgb;
	} else {
		gl_FragColor = texture2D(uImageUnit, vST);
	}
}