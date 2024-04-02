<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Book::create([
            'title' => 'The Lord of the Rings',
            'author' => 'Tolkien',
            'isbn' => '002200202022',
            'published_at' => Carbon::createFromFormat('d/m/Y', '12/07/1976'),
        ]);

        Book::create([
            'title' => 'Harry Potter et le Prince de sang-mêlé',
            'author' => 'J. K. Rowling',
            'isbn' => '002200202022',
            'published_at' => Carbon::createFromFormat('d/m/Y', '16/07/2005'),
        ]);
    }
}
