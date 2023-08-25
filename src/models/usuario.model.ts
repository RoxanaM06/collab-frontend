export interface BaseUsuario {
    _id?: string
}

export interface Usuario extends BaseUsuario {
    usuario: string|null|undefined,
    correo: string|null|undefined,
    contrasena: string|null|undefined,
    plan: {
        idPlan: string|null|undefined,
        cantidad: number
    },
    proyectos: Array<any> | null | undefined
}