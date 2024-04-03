<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreTaskRequest;
use App\Http\Requests\V1\UpdateTaskRequest;
use App\Http\Resources\V1\TaskCollection;
use App\Http\Resources\V1\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        return new TaskCollection(Task::where('user_id', $user->id)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $task = new TaskResource(Task::create($request->all()));
        return response()->json(['data' => $task, 'message' => 'Task created successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show($task)
    {
        $task = Task::find($task);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }
        return response()->json(['data' => new TaskResource($task), 'message' => 'success']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, string $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }
        $task->update($request->all());
        return response()->json(['data' => $task, 'message' => 'Task updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json(['message' => 'Task deleted', 'data' => []]);
    }
}
