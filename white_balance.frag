#version 330 compatibility

uniform sampler2D uImageUnit;
varying vec2 vST;

uniform lowp float uTemperature;
uniform lowp float uTint;

const lowp vec3 warmFilter = vec3(0.93, 0.54, 0.0);


const mediump mat3 RGBToYIQ = mat3(0.299, 0.587, 0.114, 0.596, -0.274, -0.322, 0.211, -0.523, 0.312);
const mediump mat3 YIQToRGB = mat3(1.0, 0.956, 0.621, 1.0, -0.272, -0.647, 1.0, -1.105, 1.702);

void main()
{
  lowp float temperature;
  lowp float tint;
  if(uTemperature<5000) {
   temperature=0.0004*(uTemperature-5000);
  } else {
  	temperature=0.0006*(uTemperature-5000);
  }
  tint = uTint/100.0;
	lowp vec4 source = texture2D(uImageUnit, vST);
	gl_FragColor = source;
	mediump vec3 yiq = RGBToYIQ * source.rgb;
	yiq.b = clamp(yiq.b + tint*0.5226*0.1, -0.5226, 0.5226);
	lowp vec3 rgb = YIQToRGB * yiq.rgb;
	
	lowp vec3 processed = vec3(
		(rgb.r<0.5? (2.0*rgb.r*warmFilter.r):(1.0-2.0*(1.0-rgb.r)*(1.0-warmFilter.r))),
		(rgb.g<0.5? (2.0*rgb.g*warmFilter.g):(1.0-2.0*(1.0-rgb.g)*(1.0-warmFilter.g))),
		(rgb.b<0.5? (2.0*rgb.b*warmFilter.b):(1.0-2.0*(1.0-rgb.b)*(1.0-warmFilter.b))));
	
	gl_FragColor = vec4(mix(rgb, processed, temperature), source.a);
}