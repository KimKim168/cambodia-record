<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('post_creator_link', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('post_id');
            $table->unsignedBigInteger('creator_id');

            // Foreign keys
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
            $table->foreign('creator_id')->references('id')->on('creators')->onDelete('cascade');

            $table->timestamps();

            // To prevent duplicates
            $table->unique(['post_id', 'creator_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_creator_link');
    }
};
