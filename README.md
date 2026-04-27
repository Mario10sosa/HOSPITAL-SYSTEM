# 🏥 Sistema Hospitalario - Patrones de Diseño GoF

Un sistema completo de gestión hospitalaria que implementa los patrones de diseño Gang of Four (GoF) en una arquitectura moderna Spring Boot + React.

## 📋 Características

### Backend (Spring Boot 3.x)

- **JPA/Hibernate** para persistencia de datos
- **MySQL** como base de datos
- **API REST** completa con todas las entidades
- **Patrones GoF implementados**:
  - 🏗️ **Adapter**: Integración con laboratorios externos
  - 🌉 **Bridge**: Abstracción de notificaciones (Email/SMS)
  - 📁 **Composite**: Jerarquía de departamentos
  - 🎨 **Decorator**: Servicios dinámicos para pacientes
  - ⚡ **Flyweight**: Caché de medicamentos
  - 🛡️ **Proxy**: Control de acceso basado en roles
  - 🏛️ **Facade**: Interfaz unificada del hospital

### Frontend (React 18 + TypeScript)

- **Vite** como bundler
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **Axios** para llamadas API
- **Sonner** para notificaciones
- **Interfaz moderna** con navegación clara

## 🚀 Inicio Rápido

### Prerrequisitos

- Java 17+
- Node.js 18+
- MySQL 8.0+
- Maven 3.6+

### Instalación y Ejecución

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/Mario10sosa/HOSPITAL-SYSTEM.git
   cd HOSPITAL-SYSTEM
   ```

2. **Configurar la base de datos**
   - Crear una base de datos MySQL llamada `hospital_system`
   - Actualizar las credenciales en `hospital-system-backend/src/main/resources/application.properties`

3. **Ejecutar el backend**

   ```bash
   cd hospital-system-backend
   mvn spring-boot:run
   ```

   El backend estará disponible en `http://localhost:8080`

4. **Ejecutar el frontend**
   ```bash
   cd hospital-system-frontend
   npm install
   npm run dev
   ```
   El frontend estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
HOSPITAL-SYSTEM/
├── hospital-system-backend/          # Backend Spring Boot
│   ├── src/main/java/com/example/hospitalsystembackend/
│   │   ├── controller/               # Controladores REST
│   │   ├── model/                    # Entidades JPA
│   │   ├── repository/               # Repositorios
│   │   ├── service/                  # Servicios de negocio
│   │   ├── dto/                      # Objetos de transferencia
│   │   ├── adapter/                  # Patrón Adapter
│   │   ├── bridge/                   # Patrón Bridge
│   │   ├── composite/                # Patrón Composite
│   │   ├── decorator/                # Patrón Decorator
│   │   ├── flyweight/                # Patrón Flyweight
│   │   ├── proxy/                    # Patrón Proxy
│   │   └── facade/                   # Patrón Facade
│   └── pom.xml
└── hospital-system-frontend/         # Frontend React
    ├── src/
    │   ├── components/               # Componentes reutilizables
    │   ├── pages/                    # Páginas de la aplicación
    │   ├── services/                 # Servicios API
    │   └── types/                    # Definiciones TypeScript
    └── package.json
```

## 🎯 Funcionalidades

### 👥 Gestión de Pacientes

- CRUD completo de pacientes
- Historial médico
- Servicios dinámicos (Decorator)

### 👨‍⚕️ Gestión de Doctores

- Perfiles de médicos
- Especialidades
- Disponibilidad

### 📅 Sistema de Citas

- Programación de citas
- Estados de citas (Pendiente/Completada/Cancelada)
- Notificaciones (Bridge)

### 🏥 Departamentos

- Estructura jerárquica (Composite)
- Grupos de trabajo
- Miembros por departamento

### 💊 Medicamentos

- Inventario farmacéutico
- Caché inteligente (Flyweight)
- Indicador de origen (BD/Caché)

### 🔐 Control de Acceso

- Autenticación por roles (Proxy)
- Permisos granulares

## 🏗️ Patrones de Diseño Implementados

### Adapter

- Integración con sistemas externos de laboratorios
- Adaptación de interfaces incompatibles

### Bridge

- Separación de abstracción de notificaciones
- Implementaciones Email/SMS intercambiables

### Composite

- Estructura jerárquica de departamentos
- Tratamiento uniforme de grupos y miembros

### Decorator

- Servicios dinámicos para pacientes
- Extensión funcional sin modificar clases base

### Flyweight

- Caché compartido de medicamentos
- Optimización de memoria para objetos repetitivos

### Proxy

- Control de acceso basado en roles
- Validación de permisos antes de operaciones

### Facade

- Interfaz unificada para operaciones complejas
- Simplificación de la API del sistema

## 🛠️ Tecnologías Utilizadas

### Backend

- **Spring Boot 3.x** - Framework principal
- **Spring Data JPA** - Persistencia
- **Spring Web** - API REST
- **MySQL Connector** - Base de datos
- **Lombok** - Reducción de código boilerplate

### Frontend

- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos

## 📊 API Endpoints

### Pacientes

- `GET /api/patients` - Listar pacientes
- `POST /api/patients` - Crear paciente
- `GET /api/patients/{id}` - Obtener paciente
- `PUT /api/patients/{id}` - Actualizar paciente
- `DELETE /api/patients/{id}` - Eliminar paciente

### Doctores

- `GET /api/doctors` - Listar doctores
- `POST /api/doctors` - Crear doctor
- `GET /api/doctors/{id}` - Obtener doctor
- `PUT /api/doctors/{id}` - Actualizar doctor
- `DELETE /api/doctors/{id}` - Eliminar doctor

### Citas

- `GET /api/appointments` - Listar citas
- `POST /api/appointments` - Crear cita
- `PUT /api/appointments/{id}/complete` - Completar cita
- `PUT /api/appointments/{id}/cancel` - Cancelar cita

### Departamentos

- `GET /api/departments/tree` - Obtener árbol de departamentos
- `POST /api/departments` - Crear departamento

### Medicamentos

- `GET /api/medications` - Listar medicamentos
- `POST /api/medications` - Crear medicamento
- `GET /api/medications/search?name={name}` - Buscar medicamento

### Dashboard

- `GET /api/dashboard/stats` - Estadísticas del dashboard

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Mario Sosa** - [GitHub](https://github.com/Mario10sosa)

## 🙏 Agradecimientos

- Patrones de Diseño Gang of Four
- Comunidad Spring Boot
- Comunidad React
- Documentación oficial de las tecnologías utilizadas
