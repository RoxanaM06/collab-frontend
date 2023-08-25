export interface BaseUsuario {
    _id?: string
}

export interface Usuario extends BaseUsuario {
    usuario: string|null|undefined,
    correo: string|null|undefined,
    contrasena: string|null|undefined,
    IdPlan: number|null|undefined,
    proyectos: Array<any> | null | undefined
}