<?php

namespace App\Http\Requests\V1;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
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
                'title' => ['required'],
                'author' => ['required'],
                'publishedAt' => ['required', 'date_format:d/m/Y'],
                'isbn' => ['required', 'digits: 13'],
            ];
        } else {
            return [
                'title' => ['sometimes', 'required', 'string', 'max:255'],
                'author' => ['sometimes', 'required', 'string'],
                'publishedAt' => ['sometimes', 'required', 'date_format:d/m/Y',],
                'isbn' => ['sometimes', 'required', 'digits:13'],
            ];
        }
    }
    protected function prepareForValidation()
    {
        if ($this->has('publishedAt') && !is_null($this->publishedAt)) {
            $this->merge([
                'published_at' => Carbon::createFromFormat('d/m/Y', $this->publishedAt),
            ]);
        }
    }
}
