#version 330 compatibility

uniform sampler2D uImageUnit;
uniform float uT;

varying vec2 vST;

const vec3 w = vec3(0.2125, 0.7154, 0.0721);

void main()
{
	vec3 rgb = texture(uImageUnit, vST).rgb;
	float luminance = dot(rgb, w);
	vec3 target = vec3(luminance, luminance, luminance);
	gl_FragColor = vec4(mix(target, rgb, uT),1.0);
}