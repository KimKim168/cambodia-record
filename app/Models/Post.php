<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;
    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(PostCategory::class, 'category_code', 'code');
    }

    public function creator()
    {
        return $this->belongsTo(Creator::class, 'creator_id', 'id');
    }

    public function location()
    {
        return $this->belongsTo(Location::class, 'location_id', 'id');
    }

    public function discourse()
    {
        return $this->belongsTo(Discourse::class, 'discourse_id', 'id');
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class, 'topic_id', 'id');
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'id');
    }

    public function people()
    {
        return $this->belongsTo(People::class, 'people_id', 'id');
    }
    public function person()
    {
        return $this->belongsTo(People::class, 'people_id', 'id');
    }

    public function publisher()
    {
        return $this->belongsTo(Publisher::class, 'publisher_id', 'id');
    }
    public function publishing_country()
    {
        return $this->belongsTo(PublishingCountry::class, 'publishing_countries_code', 'code');
    }
    public function source_detail()
    {
        return $this->belongsTo(Link::class, 'source', 'id');
    }
    public function created_by()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function updated_by()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }
    public function images()
    {
        return $this->hasMany(PostImage::class, 'post_id', 'id');
    }
    public function topics()
    {
        return $this->belongsToMany(Topic::class, 'post_topic_link', 'post_id', 'topic_id');
    }

    public function locations()
    {
        return $this->belongsToMany(Location::class, 'post_location_link', 'post_id', 'location_id');
    }

    public function peoples()
    {
        return $this->belongsToMany(People::class, 'post_people_link', 'post_id', 'person_id');
    }

    public function creators()
    {
        return $this->belongsToMany(Creator::class, 'post_creator_link', 'post_id', 'creator_id');
    }

     public function types()
    {
        return $this->belongsToMany(Type::class, 'post_type_link', 'post_id', 'type_id');
    }
    public function upload_file()
    {
        return $this->hasMany(PostUploadFile::class, 'post_id', 'id');
    }
    // public function videos()
    // {
    //     return $this->hasMany(PostVideoLink::class, 'post_id', 'id');
    // }
    // public function files()
    // {
    //     return $this->hasMany(PostFile::class, 'post_id', 'id');
    // }
}
