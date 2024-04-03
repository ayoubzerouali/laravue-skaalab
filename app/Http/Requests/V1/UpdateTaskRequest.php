<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->user();
        return $user !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if ($this->method() === 'PUT') {
            return [
                'name' => ['required', 'string'],
                'stat' => ['nullable'],
                'text' => ['nullable', 'string']
            ];
        } else {
            return [
                'name' => ['sometimes', 'required', 'string'],
                'stat' => ['sometimes', 'nullable'],
                'text' => ['sometimes', 'nullable', 'string']
            ];
        }
    }
}
