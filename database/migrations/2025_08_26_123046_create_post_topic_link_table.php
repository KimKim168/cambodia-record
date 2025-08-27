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
        Schema::create('post_topic_link', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('post_id');
            $table->unsignedBigInteger('topic_id');

            // Foreign keys
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
            $table->foreign('topic_id')->references('id')->on('topics')->onDelete('cascade');

            $table->timestamps();

            // To prevent duplicates
            $table->unique(['post_id', 'topic_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_topic_link');
    }
};
