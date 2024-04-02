<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\V1\BookCollection;
use App\Http\Resources\V1\BookResource;
use App\Models\Book;
use App\Http\Requests\V1\StoreBookRequest;
use App\Http\Requests\V1\UpdateBookRequest;
use App\Http\Controllers\Controller;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new BookCollection(Book::paginate(10));
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request)
    {

        $data = new BookResource(Book::create($request->all()));
        return response()->json($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($book)
    {
        $book = Book::find($book);

        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }
        $data = new BookResource($book);
        return response()->json($data, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        $book->update($request->all());
        return response()->json($book, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();
        return response()->json(null, 204);
    }
}
