
in vec2 vST;
uniform sampler2D uImageUnit;
uniform float uVibrance;

void main()
{
	vec3 irgb = texture2D(uImageUnit, vST).rgb;
	float avg = (irgb.r+irgb.g+irgb.b)/3.0;
	float max_ = max(irgb.r, max(irgb.g, irgb.b));
	float a = (max_ - avg)*(-uVibrance*3.);
	gl_FragColor = vec4(mix(irgb, vec3(max_), a),1.);
}