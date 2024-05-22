<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
        <style>
            #app{
                margin-top: 60px;
                text-align: center
            }
        </style>
   
        @vite('resources/css/app.css')
        
    </head>
    <body>
        <div id="app"></div>
        
        <div hx-get="/clicked" style="border:solid 2px rgb(39, 116, 184)" hx-trigger="click[ctrlKey]">
            Control Click Me
        </div>
        
        @vite('resources/js/app.js')
        @if(session('error'))
            <script>
                console.log("{{session('error')}}")
            </script>
        @endif
        <script src="https://unpkg.com/htmx.org@1.9.12" integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    </body>
</html>
