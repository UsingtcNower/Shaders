#version 330 compatibility

out vec3 vNormal;

void main()
{
	vNormal = normalize(uNormalMatrix * aNormal);
	gl_Position = uModelViewMatrix * aVertex;
}