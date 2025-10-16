#!/bin/bash

echo "🚀 Probando API Backend - Prueba Técnica"
echo "========================================"
echo ""

echo "📝 1. Health Check"
curl -s http://localhost:3000/health | jq
echo -e "\n"

echo "🔐 2. Login como Admin"
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}')
echo $LOGIN_RESPONSE | jq
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.data.token')
echo -e "\n"

echo "👤 3. Obtener información del usuario actual"
curl -s http://localhost:3000/auth/me \
  -H "Authorization: Bearer $TOKEN" | jq
echo -e "\n"

echo "👥 4. Crear un empleado"
EMPLOYEE=$(curl -s -X POST http://localhost:3000/employees \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"nombre":"Maria Garcia","fecha_ingreso":"2024-03-01","salario":60000}')
echo $EMPLOYEE | jq
EMPLOYEE_ID=$(echo $EMPLOYEE | jq -r '.data.id')
echo -e "\n"

echo "📄 5. Obtener empleado por ID"
curl -s http://localhost:3000/employees/$EMPLOYEE_ID \
  -H "Authorization: Bearer $TOKEN" | jq
echo -e "\n"

echo "📋 6. Crear una solicitud"
REQUEST=$(curl -s -X POST http://localhost:3000/requests \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"codigo\":\"REQ-002\",\"descripcion\":\"Solicitud de permiso\",\"resumen\":\"Permiso medico\",\"id_empleado\":$EMPLOYEE_ID}")
echo $REQUEST | jq
REQUEST_ID=$(echo $REQUEST | jq -r '.data.id')
echo -e "\n"

echo "📄 7. Obtener solicitud por ID"
curl -s http://localhost:3000/requests/$REQUEST_ID \
  -H "Authorization: Bearer $TOKEN" | jq
echo -e "\n"

echo "🔐 8. Login como User (no admin)"
USER_LOGIN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"user123"}')
echo $USER_LOGIN | jq
USER_TOKEN=$(echo $USER_LOGIN | jq -r '.data.token')
echo -e "\n"

echo "❌ 9. Intentar eliminar solicitud con usuario normal (debe fallar)"
curl -s -X DELETE http://localhost:3000/requests/$REQUEST_ID \
  -H "Authorization: Bearer $USER_TOKEN" | jq
echo -e "\n"

echo "✅ 10. Eliminar solicitud con usuario admin (debe funcionar)"
curl -s -X DELETE http://localhost:3000/requests/$REQUEST_ID \
  -H "Authorization: Bearer $TOKEN" | jq
echo -e "\n"

echo "🔴 11. Cerrar sesión"
curl -s -X POST http://localhost:3000/auth/logout \
  -H "Authorization: Bearer $TOKEN" | jq
echo -e "\n"

echo "✅ Todas las pruebas completadas!"
