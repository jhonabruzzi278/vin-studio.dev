import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LabelDemo() {
  return (
    <div className="space-y-8">
      {/* Ejemplo 1: Label básico con Input */}
      <div className="space-y-3">
        <Label htmlFor="email">Email</Label>
        <Input 
          type="email" 
          id="email" 
          placeholder="tu@email.com" 
        />
      </div>

      {/* Ejemplo 2: Label con descripción */}
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="username">Nombre de usuario</Label>
          <p className="text-sm text-zinc-500">
            Este será tu identificador público
          </p>
        </div>
        <Input 
          type="text" 
          id="username" 
          placeholder="@usuario" 
        />
      </div>

      {/* Ejemplo 3: Label con Input deshabilitado */}
      <div className="space-y-3">
        <Label htmlFor="disabled" className="text-zinc-400">
          Campo deshabilitado
        </Label>
        <Input 
          type="text" 
          id="disabled" 
          placeholder="No editable" 
          disabled 
        />
      </div>

      {/* Ejemplo 4: Label con estado requerido */}
      <div className="space-y-3">
        <Label htmlFor="required">
          Nombre completo
          <span className="text-zinc-900 ml-1">*</span>
        </Label>
        <Input 
          type="text" 
          id="required" 
          placeholder="Tu nombre" 
          required 
        />
      </div>
    </div>
  );
}
