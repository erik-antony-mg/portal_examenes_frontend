export interface UsuarioCompleto {
  usuarioID?:      number;
  nombre?:         string;
  apellido?:       string;
  email?:          string;
  username?:       string;
  password?:       string;
  dateBirth?:      string;
  age?:            number;
  phone?:          string;
  enable?:         boolean;
  perfil?:         string;
  nombreCompleto?: string;
  roles?:          Role[];
}

export interface Role {
  idRoleEntity?: number;
  name?:         string;
}
