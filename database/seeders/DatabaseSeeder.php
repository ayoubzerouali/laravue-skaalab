<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Task::create([
            'name' => 'Test Task',
            'text' => 'Plain text for testing 1 2 1 3 1 2 1 3',
            'stat' => 'todo',
            'user_id' => 1
        ]);

        $this->call(BookSeeder::class); //)
    }
}
