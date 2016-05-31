in vec3 vColor;
in float vLightIntensity;

void main()
{
	gl_FragColor = vec4(vColor*vLightIntensity,1);
}