#version 330

in float gLightIntensity;

layout(location=0) out vec4 fFragColor;

const vec3 COLOR  = vec3(1., .5, 0.);

void main()
{
	fFragColor = vec4(gLightIntensity * COLOR, 1.);
}