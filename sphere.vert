const vec3 LIGHTPOS = vec3(10., 10., 10.);

out vec3 vColor;
out vec3 vMCposition;
out float vLightIntensity;

void main()
{
	vec3 transNorm = normalize(uNormalMatrix * aNormal);
	vec3 ECposition = vec3(uModelViewMatrix * aVertex);
	vLightIntensity = dot(normalize(LIGHTPOS-ECposition),transNorm);
	vLightIntensity = clamp(.3+abs(vLightIntensity),0,1);
	
	vColor = aColor;
	vMCposition = aVertex.xyz;
	gl_Position = uModelViewProjectionMatrix * aVertex;
}