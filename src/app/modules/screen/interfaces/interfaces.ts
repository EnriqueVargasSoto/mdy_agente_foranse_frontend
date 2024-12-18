export interface Datum {
  hour:    string;
  screens: Screen[];
}

export interface Screen {
  id?:            number;
  in_TrackingId?: number;
  objectName?:    string;
  url?:           string;
  created_at?:    Date;
  updated_at?:    Date;
  tracking?:      Tracking;
}

export interface Tracking {
  id:                  number;
  in_CampanaDetalleId: number;
  sistemaOperativo:    string;
  procesador:          string;
  ram:                 string;
  mac:                 string;
  ipPublica:           string;
  ipPrivada:           string;
  ubicacionGeografica: string;
  idPc:                string;
  nombre:              string;
  tipo:                string;
  cliente:             string;
  hostname:            string;
  created_at:          Date;
  updated_at:          Date;
  campana_detalle:     CampanaDetalle;
}

export interface CampanaDetalle {
  Id:            number;
  in_CampanaId:  number;
  in_Estado:     number;
  in_PersonaId:  number;
  in_SegmentoId: number;
  in_CentroId:   number;
  persona:       Persona;
}

export interface Persona {
  id:                                          number;
  in_TipoDocumento:                            number;
  in_NumDocumentoIdentidad:                    string;
  vc_Nombres:                                  string;
  vc_ApePaterno:                               string;
  vc_ApeMaterno:                               string;
  in_Edad:                                     number;
  in_Sexo:                                     number;
  vc_Correo:                                   string;
  vc_usuario:                                  string;
  vc_clave:                                    string;
  in_PaisId:                                   number;
  in_CentroId:                                 number;
  in_CampanaId:                                number;
  in_SegmentoId:                               number;
  in_AreaId:                                   number;
  in_PerfilId:                                 number;
  in_ModalidadId:                              number;
  in_Nivel:                                    number;
  in_Estado:                                   number;
  dt_FecNacimiento:                            Date;
  in_flat:                                     number;
  in_CargoId:                                  number;
  in_telefono:                                 string;
  in_EstadoCivilId:                            number;
  in_BlackList:                                number;
  vc_MotivoBlackList:                          string;
  id_usuarioRegistroBlackList:                 null;
  dt_fechaRegistroBlackList:                   Date;
  is_Conectado:                                number;
  is_realizoEncuesta:                          null;
  is_finalizoEncuesta:                         null;
  dt_fecharegistroEncuesta:                    null;
  in_usuariogestionEncuesta:                   null;
  in_estadogestion:                            null;
  vc_comentarioGestion:                        null;
  is_AproboDocumentosPuestoTrabajo:            null;
  is_RealizoDocumentosPuestoTrabajo:           null;
  dt_FechaActivo:                              null;
  dt_FechaAnulo:                               null;
  dt_FechaModifico:                            null;
  dt_FechaRegistro:                            Date;
  in_IdUsuarioActivo:                          null;
  in_IdUsuarioAnulo:                           null;
  in_IdUsuarioModifico:                        null;
  in_IdUsuarioRegistro:                        number;
  dt_FechaUltimoCambioClave:                   Date;
  ip_conexion:                                 string;
  is_notificaciones:                           null;
  dt_FechaIngreso:                             Date;
  dt_fecha_gestiono_encuesta_autoevaluacion:   null;
  dt_fecha_gestiono_file_autoevaluacion:       null;
  in_usuario_gestiono_encuesta_autoevaluacion: null;
  in_usuario_gestiono_file_autoevaluacion:     null;
  vc_correo_corporativo:                       null;
  in_usuarioreinicio_clave:                    null;
  dt_fechareinicioclave:                       null;
  url_avatar_perfil:                           null;
  url_firma_digital:                           null;
  in_jefe_inmediato1:                          number;
  in_jefe_inmediato2:                          number;
  dt_reg_token:                                null;
  vc_acc_token:                                null;
  vc_ref_token:                                null;
}
