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
	
#define SHARPNESS
	
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

#ifdef SATURATION
	float lum = dot(irgb, vec3(0.2125, 0.7154, 0.0721));
	vec3 target = vec3(lum, lum, lum);
	color = vec4(mix(target, irgb, uT), 1.);
#endif

#ifdef DIFFERENCE
	vec3 target = abs(argb - brgb);
	if(uT <= 1.)
		color = vec4(mix(argb, brgb, uT), 1.);
	else
		color = vec4(mix(brgb, target, uT-1.), 1.);
#endif

#ifdef DISSOLVE
	color = vec4(mix(argb, brgb, uT), 1.);
#endif

#ifdef SHARPNESS
	vec2 stp0 = vec2(1./uResS, 0.);
	vec2 st0p = vec2(0., 1./uResT);
	vec2 stpp = vec2(1./uResS, 1./uResT);
	vec2 stpm = vec2(1./uResS, -1./uResT);
	vec3 i00 = texture2D(uImageUnit, vST).rgb;
	vec3 im1m1 = texture2D(uImageUnit, vST - stpp).rgb;
	vec3 ip1p1 = texture2D(uImageUnit, vST + stpp).rgb;
	vec3 im1p1 = texture2D(uImageUnit, vST - stpm).rgb;
	vec3 ip1m1 = texture2D(uImageUnit, vST + stpm).rgb;
	vec3 im10 = texture2D(uImageUnit, vST - stp0).rgb;
	vec3 ip10 = texture2D(uImageUnit, vST + stp0).rgb;
	vec3 i0m1 = texture2D(uImageUnit, vST - st0p).rgb;
	vec3 i1m0 = texture2D(uImageUnit, vST + st0p).rgb;
	vec3 target = vec3(0.,0.,0.);
	target += 1.*(im1p1+ip1p1+im1p1+ip1m1);
	target += 2.*(im10+ip10+i0m1+i1m0);
	target += 4.*i00;
	target /= 16.;
	color = vec4(mix(target, irgb, uT), 1.);
#endif

	gl_FragColor = color;
}