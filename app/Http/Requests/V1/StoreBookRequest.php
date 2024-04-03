<?php

namespace App\Http\Requests\V1;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
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
        return [
            'title' => ['required'],
            'author' => ['required', 'string'],
            'publishedAt' => ['required', 'date_format:d/m/Y'],
            'isbn' => ['required', 'string', 'digits: 13'],
        ];
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
