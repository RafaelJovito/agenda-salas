<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Regras de validação
    public static function regrasValidacao()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed', // Exigir confirmação de senha
        ];
    }

    // Mutator para senha
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    // Método para verificar senha
    public function verificarSenha(string $senha): bool
    {
        return password_verify($senha, $this->password);
    }

    // Relação com reservas
    public function reservas()
    {
        return $this->hasMany(Reserva::class); // Um usuário pode ter muitas reservas
    }
}
