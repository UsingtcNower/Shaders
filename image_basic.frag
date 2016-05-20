#version 330 compatibility

uniform sampler2D uImageUnit, uBeforeUnit, uAfterUnit;
uniform float uAngle;
uniform float uT;
uniform float uResS, uResT;

in vec2 vST;

const float PI = 3.1415926;
const float PI_OVER_4 = PI/4.0;
const float SIN_PI_OVER_4 = 0.707;

void main()
{
	vec3 irgb = texture2D(uImageUnit, vST).rgb;
	vec3 brgb = texture2D(uBeforeUnit, vST).rgb;
	vec3 argb = texture2D(uAfterUnit, vST).rgb;
	vec4 color = vec4(1.0,0.,0.,1.);
	
#define CONTRAST
	
#ifdef NEGATIVE
	color.rgb = vec3(1.,1.,1.) - irgb;
#endif

#ifdef BRIGHTNESS
	vec3 target = vec3(0.,0.,0.);
	color = vec4(mix(target,irgb,uT),1.0);
#endif

#ifdef CONTRAST
	vec3 target = vec3(0.5, 0.5, 0.5);
	color = vec4(mix(target, irgb,  uT), 1.0);
#endif

	gl_FragColor = color;
}